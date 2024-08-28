<?php

/*
 * This file is part of foskym/flarum-sorts-for-user-directory.
 *
 * Copyright (c) 2024 FoskyM.
 *
 * For the full copyright and license information, please view the LICENSE.md
 * file that was distributed with this source code.
 */

namespace FoskyM\SortsForUserDirectory\Filter;

use Flarum\Filter\FilterState;
use Flarum\Query\QueryCriteria;
use Illuminate\Database\Capsule\Manager as DB;

class SortFilter
{
    public function __invoke(FilterState $filter, QueryCriteria $queryCriteria)
    {
        $sort = $_REQUEST['user-directory.sort'] ?? 'username';
        $tablePrefix = DB::getTablePrefix();

        $desc = false;
        if (substr($sort, 0, 1) === '-') {
            $desc = true;
            $sort = substr($sort, 1);
        }

        if ($sort == 'groups_count') {
            $filter->getQuery()->selectRaw($tablePrefix . 'users.*, COUNT(' . $tablePrefix . 'group_user.user_id) as groups_count')
                ->leftJoin('group_user', 'users.id', '=', 'group_user.user_id')
                ->groupBy('users.id')
                ->orderBy('groups_count', $desc ? 'desc' : 'asc');
        } else if ($sort === 'monthly_discussion_count') {
            $filter->getQuery()->selectRaw($tablePrefix . 'users.*, COALESCE(COUNT(' . $tablePrefix . 'discussions.id), 0) as monthly_discussion_count')
                ->leftJoin('discussions', function ($join) use ($tablePrefix) {
                    $join->on('users.id', '=', 'discussions.user_id')
                        ->whereBetween('discussions.created_at', [date('Y-m-01 00:00:00'), date('Y-m-t 23:59:59')]);
                })
                ->groupBy('users.id')
                ->orderBy('monthly_discussion_count', $desc ? 'desc' : 'asc');
        } else if ($sort === 'monthly_comment_count') {
            $filter->getQuery()->selectRaw($tablePrefix . 'users.*, COALESCE(COUNT(' . $tablePrefix . 'posts.id), 0) as monthly_comment_count')
                ->leftJoin('posts', function ($join) use ($tablePrefix) {
                    $join->on('users.id', '=', 'posts.user_id')
                        ->whereBetween('posts.created_at', [date('Y-m-01 00:00:00'), date('Y-m-t 23:59:59')])
                        ->where('posts.number', '>', 1);
                })
                ->groupBy('users.id')
                ->orderBy('monthly_comment_count', $desc ? 'desc' : 'asc');
        } else if ($sort === 'invited_user') {
            $filter->getQuery()->selectRaw($tablePrefix . 'users.*, COALESCE(COUNT(' . $tablePrefix . 'invite_user.id), 0) as invited_user')
                ->leftJoin('invite_user', 'users.id', '=', 'invite_user.invited_by_user_id')
                ->groupBy('users.id')
                ->orderBy('invited_user', $desc ? 'desc' : 'asc');
        } else if ($sort === 'badges_count') {
            $filter->getQuery()->selectRaw($tablePrefix . 'users.*, COALESCE(COUNT(' . $tablePrefix . 'badge_user.user_id), 0) as badges_count')
                ->leftJoin('badge_user', 'users.id', '=', 'badge_user.user_id')
                ->groupBy('users.id')
                ->orderBy('badges_count', $desc ? 'desc' : 'asc');
        }
    }
}