import app from 'flarum/forum/app';
import { override, extend } from 'flarum/common/extend';
import User from 'flarum/common/models/User';
import Model from 'flarum/common/Model';
import UserCard from 'flarum/forum/components/UserCard';
import icon from 'flarum/common/helpers/icon';

import addSort from '../common/addSort';

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
    const originalSortMap = UserDirectoryState.prototype.sortMap();
    override(UserDirectoryState.prototype, 'loadResults', function (original, offset) {
      const sort = this.params.sort || 'default';
      if (sort !== app.forum.attribute('userDirectoryDefaultSort') && !(sort in originalSortMap)) {
        const params = this.requestParams();
        params.page = { offset };
        params.include = params.include.join(',');

        return this.app.store.find('users', params);
      }

      return original(offset);
    });
    override(UserDirectoryState.prototype, 'sortMap', function (original) {
      let map = original();
      map = addSort(map);
      return map;
    });
  }
});
