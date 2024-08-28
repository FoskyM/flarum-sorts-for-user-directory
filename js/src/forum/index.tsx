import app from 'flarum/forum/app';
import { override, extend } from 'flarum/common/extend';
import User from 'flarum/common/models/User';
import Model from 'flarum/common/Model';
import UserCard from 'flarum/forum/components/UserCard';
import icon from 'flarum/common/helpers/icon';

app.initializers.add('foskym/flarum-sorts-for-user-directory', () => {
  extend(UserCard.prototype, 'infoItems', function (items) {
    const user = this.attrs.user;
    if (!user) return;
    if (!app.forum.attribute('foskym-sorts-for-user-directory.sort_by_monthly_posts')) return;
    items.add(
      'monthly-discussion-count',
      <span className="UserCard-MonthlyDiscussionCount">
        {[
          icon('fas fa-comment'),
          ' ',
          app.translator.trans('foskym-sorts-for-user-directory.forum.user_card.monthly_discussions', {
            count: user.data.attributes.monthlyDiscussionCount,
          }),
        ]}
      </span>,
      70
    );
    items.add(
      'monthly-comment-count',
      <span className="UserCard-MonthlyCommentCount">
        {[
          icon('fas fa-comments'),
          ' ',
          app.translator.trans('foskym-sorts-for-user-directory.forum.user_card.monthly_comments', {
            count: user.data.attributes.monthlyCommentCount,
          }),
        ]}
      </span>,
      70
    );
  });

  if ('fof-user-directory' in flarum.extensions) {
    const UserDirectoryState = flarum.extensions['fof-user-directory']?.UserDirectoryState as any;
    override(UserDirectoryState.prototype, 'sortMap', function (original) {
      const map = original();
      if ('flarum-nicknames' in flarum.extensions) {
        if (app.forum.attribute('foskym-sorts-for-user-directory.sort_by_nickname')) {
          map['nickname_az'] = 'nickname';
          map['nickname_za'] = '-nickname';
        }
      }

      if (app.forum.attribute('foskym-sorts-for-user-directory.sort_by_monthly_posts')) {
        map['most_monthly_discussions'] = '-monthly_discussion_count';
        map['most_monthly_comments'] = '-monthly_comment_count';
      }

      if (app.forum.attribute('foskym-sorts-for-user-directory.sort_by_groups_count')) {
        map['most_groups_count'] = '-groups_count';
      }

      if (app.forum.attribute('foskym-sorts-for-user-directory.sort_by_recently_seen')) {
        map['recently_seen'] = '-last_seen_at';
        map['least_recently_seen'] = 'last_seen_at';
      }

      if (app.forum.attribute('foskym-sorts-for-user-directory.sort_by_comments')) {
        map['most_comments'] = '-comment_count';
        map['least_comments'] = 'comment_count';
      }

      if ('antoinefr-money' in flarum.extensions) {
        if (app.forum.attribute('foskym-sorts-for-user-directory.sort_by_money')) {
          map['most_money'] = '-money';
          map['least_money'] = 'money';
        }
      }

      if ('clarkwinkelmann-likes-received' in flarum.extensions) {
        if (app.forum.attribute('foskym-sorts-for-user-directory.sort_by_likes_received')) {
          map['most_likes_received'] = '-clarkwinkelmann_likes_received_count';
          map['least_likes_received'] = 'clarkwinkelmann_likes_received_count';
        }
      }

      if ('ziiven-daily-check-in' in flarum.extensions) {
        if (app.forum.attribute('foskym-sorts-for-user-directory.sort_by_ziven_checkin')) {
          map['recently_checkin'] = '-last_checkin_time';
          map['most_total_checkin'] = '-total_checkin_count';
          map['most_total_continuous_checkin'] = '-total_continuous_checkin_count';
        }
      }

      if ('xypp-invite-user' in flarum.extensions) {
        if (app.forum.attribute('foskym-sorts-for-user-directory.sort_by_invited_user')) {
          map['most_invited_user'] = '-invited_user';
        }
      }

      return map;
    });
  }
});
