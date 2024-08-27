import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';

app.initializers.add('foskym/flarum-sorts-for-user-directory', () => {
  if ('fof-user-directory' in flarum.extensions) {
    const UserDirectoryState = flarum.extensions['fof-user-directory']?.UserDirectoryState as any;
    override(UserDirectoryState.prototype, 'sortMap', function (original) {
      const map = original();
      map['recently_seen'] = '-last_seen_at';
      map['least_recently_seen'] = 'last_seen_at';
      map['most_comments'] = '-comment_count';
      map['least_comments'] = 'comment_count';
      if ('antoinefr-money' in flarum.extensions) {
        map['most_money'] = '-money';
        map['least_money'] = 'money';
      }
      if ('clarkwinkelmann-likes-received' in flarum.extensions) {
        map['most_likes_received'] = '-clarkwinkelmann_likes_received_count';
        map['least_likes_received'] = 'clarkwinkelmann_likes_received_count';
      }
      return map;
    });
  }
});
