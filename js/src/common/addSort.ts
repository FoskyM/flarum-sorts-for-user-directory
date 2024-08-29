import app from 'flarum/common/app';

export default function addSort(map: any, isAdmin = false) {
  const sortTypes: any = {
    core: [
      {
        key: 'foskym-sorts-for-user-directory.sort_by_monthly_posts',
        map: {
          most_monthly_discussions: '-monthly_discussion_count',
          most_monthly_comments: '-monthly_comment_count',
        }
      },
      {
        key: 'foskym-sorts-for-user-directory.sort_by_groups_count',
        map: {
          most_groups_count: '-groups_count',
        }
      },
      {
        key: 'foskym-sorts-for-user-directory.sort_by_recently_seen',
        map: {
          recently_seen: '-last_seen_at',
          least_recently_seen: 'last_seen_at',
        }
      },
      {
        key: 'foskym-sorts-for-user-directory.sort_by_comments',
        map: {
          most_comments: '-comment_count',
          least_comments: 'comment_count',
        }
      },
    ],
    'flarum-nicknames': [
      {
        key: 'foskym-sorts-for-user-directory.sort_by_nickname',
        map: {
          nickname_az: 'nickname',
          nickname_za: '-nickname',
        },
      },
    ],
    'antoinefr-money': [
      {
        key: 'foskym-sorts-for-user-directory.sort_by_money',
        map: {
          most_money: '-money',
          least_money: 'money',
        },
      },
    ],
    'clarkwinkelmann-likes-received': [
      {
        key: 'foskym-sorts-for-user-directory.sort_by_likes_received',
        map: {
          most_likes_received: '-clarkwinkelmann_likes_received_count',
          least_likes_received: 'clarkwinkelmann_likes_received_count',
        },
      },
    ],
    'ziiven-daily-check-in': [
      {
        key: 'foskym-sorts-for-user-directory.sort_by_ziven_checkin',
        map: {
          recently_checkin: '-last_checkin_time',
          most_total_checkin: '-total_checkin_count',
          most_total_continuous_checkin: '-total_continuous_checkin_count',
        },
      },
    ],
    'xypp-invite-user': [
      {
        key: 'foskym-sorts-for-user-directory.sort_by_invited_user',
        map: {
          most_invited_user: '-invited_user',
        },
      },
    ],
    'v17development-user-badges': [
      {
        key: 'foskym-sorts-for-user-directory.sort_by_badges_count',
        map: {
          most_badges_count: '-badges_count',
        },
      },
    ],
  };

  for (const sortType in sortTypes) {
    for (const sort of sortTypes[sortType]) {
      if (sortType !== 'core' && sortType in flarum.extensions) {
        continue;
      }
      const enabled = isAdmin ? app.data.settings[sort.key] : app.forum.attribute(sort.key);
      if (enabled) {
        for (const key in sort.map) {
          map[key] = sort.map[key];
        }
      }
    }
  }
  return map;
}
