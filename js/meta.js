$(document).ready(function() {
  if (typeof FileActions !== "undefined") {
  FileActions.registerAction({name: 'Metadata',
                              mime: 'all',
                              permissions: OC.PERMISSION_READ,
                              icon: OC.imagePath('core', 'actions/info'),
                              actionHandler: function (filename, context) {
                                alert('//TODO: Implement Metadata');
                              },
  });
  }
});
