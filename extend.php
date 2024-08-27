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

use Flarum\Extend;
use Flarum\Api\Controller\ListUsersController;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/less/admin.less'),
    new Extend\Locales(__DIR__.'/locale'),

    (new Extend\Settings())
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_nickname', 'foskym-sorts-for-user-directory.sort_by_nickname')
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_money', 'foskym-sorts-for-user-directory.sort_by_money')
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_likes_received', 'foskym-sorts-for-user-directory.sort_by_likes_received')
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_recently_seen', 'foskym-sorts-for-user-directory.sort_by_recently_seen')
        ->serializeToForum('foskym-sorts-for-user-directory.sort_by_comments', 'foskym-sorts-for-user-directory.sort_by_comments'),

    (new Extend\ApiController(ListUsersController::class))
        ->addSortField('money')
        ->addSortField('clarkwinkelmann_likes_received_count')
        ->addSortField('last_seen_at')
        ->addSortField('comment_count')
        ->addSortField('nickname'),
];
