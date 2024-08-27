import app from 'flarum/forum/app';
import { override } from 'flarum/common/extend';

app.initializers.add('foskym/flarum-sorts-for-user-directory', () => {
  if ('fof-user-directory' in flarum.extensions) {
    const UserDirectoryState = flarum.extensions['fof-user-directory']?.UserDirectoryState as any;
    override(UserDirectoryState.prototype, 'sortMap', function (original) {
      const map = original();
      if ('antoinefr-money' in flarum.extensions) {
        map['most_money'] = '-money';
        map['least_money'] = 'money';
      }
      return map;
    });
  }
});
