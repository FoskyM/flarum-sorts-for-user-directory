import app from 'flarum/admin/app';

app.initializers.add('foskym/flarum-sorts-for-user-directory', () => {
  app.extensionData.for('foskym-sorts-for-user-directory')
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
    });
});
