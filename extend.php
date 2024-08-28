<?php

/*
 * This file is part of foskym/flarum-sorts-for-user-directory.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\SortsForUserDirectory;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\Api\Controller\ListUsersController;
use Flarum\User\Filter\UserFilterer;
use Flarum\User\User;

$settings = app('flarum.settings');

$extend = [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/less/admin.less'),
    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\Settings())
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_nickname', 'foskym-sorts-for-user-directory.sort_by_nickname')
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_monthly_posts', 'foskym-sorts-for-user-directory.sort_by_monthly_posts')
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_groups_count', 'foskym-sorts-for-user-directory.sort_by_groups_count')
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_money', 'foskym-sorts-for-user-directory.sort_by_money')
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_likes_received', 'foskym-sorts-for-user-directory.sort_by_likes_received')
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_recently_seen', 'foskym-sorts-for-user-directory.sort_by_recently_seen')
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_comments', 'foskym-sorts-for-user-directory.sort_by_comments')
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_ziven_checkin', 'foskym-sorts-for-user-directory.sort_by_ziven_checkin'),

    (new Extend\ApiController(ListUsersController::class))
        ->addSortField('money')
        ->addSortField('clarkwinkelmann_likes_received_count')
        ->addSortField('last_seen_at')
        ->addSortField('comment_count')
        ->addSortField('nickname')
        // Ziven Daily Check In
        ->addSortField('total_checkin_count')
        ->addSortField('total_continuous_checkin_count')
        ->addSortField('last_checkin_time')

        ->addSortField('groups_count'),

    // fake sort field
    (new Extend\Middleware('api'))
        ->add(Middleware\BeforeMiddleware::class)
        ->add(Middleware\AfterMiddleware::class),
    // use filter to sort (amazing way)
    (new Extend\Filter(UserFilterer::class))
        ->addFilterMutator(Filter\SortFilter::class),
];

if ($settings->get('foskym-sorts-for-user-directory.sort_by_monthly_posts')) {
    $extend[] = (new Extend\ApiController(ListUsersController::class))
        ->addSortField('monthly_discussion_count')
        ->addSortField('monthly_comment_count');

    $extend[] = (new Extend\ApiSerializer(UserSerializer::class))
        ->attribute('monthlyDiscussionCount', function (UserSerializer $serializer, User $user) {
            $monthly_discussion_count = $user->discussions()
                ->whereBetween('created_at', [date('Y-m-01 00:00:00'), date('Y-m-t 23:59:59')])
                ->count();
            return $monthly_discussion_count;
        })
        ->attribute('monthlyCommentCount', function (UserSerializer $serializer, User $user) {
            $monthly_comment_count = $user->posts()
                ->whereBetween('created_at', [date('Y-m-01 00:00:00'), date('Y-m-t 23:59:59')])
                ->where('number', '>', 1)
                ->count();
            return $monthly_comment_count;
        });
}

return $extend;