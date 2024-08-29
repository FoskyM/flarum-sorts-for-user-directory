import app from 'flarum/admin/app';
import LinkButton from 'flarum/common/components/LinkButton';

app.initializers.add('foskym/flarum-sorts-for-user-directory', () => {
  app.extensionData
    .for('foskym-sorts-for-user-directory')
    .registerSetting(function () {
      return (
        <div className="Form-group">
          <label>
            <LinkButton
              href={app.route('extension', {
                id: 'fof-user-directory',
              })}
            >
              {app.translator.trans('foskym-sorts-for-user-directory.admin.go_to_user_directory_extension')}
            </LinkButton>
          </label>
        </div>
      );
    })
    .registerSetting({
      setting: 'foskym-sorts-for-user-directory.sort_by_nickname',
      label: app.translator.trans('foskym-sorts-for-user-directory.admin.settings.sort_by_nickname'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-sorts-for-user-directory.sort_by_monthly_posts',
      label: app.translator.trans('foskym-sorts-for-user-directory.admin.settings.sort_by_monthly_posts'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-sorts-for-user-directory.sort_by_groups_count',
      label: app.translator.trans('foskym-sorts-for-user-directory.admin.settings.sort_by_groups_count'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-sorts-for-user-directory.sort_by_money',
      label: app.translator.trans('foskym-sorts-for-user-directory.admin.settings.sort_by_money'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-sorts-for-user-directory.sort_by_likes_received',
      label: app.translator.trans('foskym-sorts-for-user-directory.admin.settings.sort_by_likes_received'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-sorts-for-user-directory.sort_by_recently_seen',
      label: app.translator.trans('foskym-sorts-for-user-directory.admin.settings.sort_by_recently_seen'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-sorts-for-user-directory.sort_by_comments',
      label: app.translator.trans('foskym-sorts-for-user-directory.admin.settings.sort_by_comments'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-sorts-for-user-directory.sort_by_ziven_checkin',
      label: app.translator.trans('foskym-sorts-for-user-directory.admin.settings.sort_by_ziven_checkin'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-sorts-for-user-directory.sort_by_invited_user',
      label: app.translator.trans('foskym-sorts-for-user-directory.admin.settings.sort_by_invited_user'),
      type: 'boolean',
    })
    .registerSetting({
      setting: 'foskym-sorts-for-user-directory.sort_by_badges_count',
      label: app.translator.trans('foskym-sorts-for-user-directory.admin.settings.sort_by_badges_count'),
      type: 'boolean',
    });

  app.extensionData.for('fof-user-directory').registerSetting(function () {
    return (
      <div className="Form-group">
        <label>
          <LinkButton
            href={app.route('extension', {
              id: 'foskym-sorts-for-user-directory',
            })}
          >
            {app.translator.trans('foskym-sorts-for-user-directory.admin.go_to_this_extension')}
          </LinkButton>
        </label>
      </div>
    );
  });
});
