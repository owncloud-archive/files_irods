function showModal(filename, context) {
  OC.dialogs.info("Loading...", 'Metadata for ' + filename, function() {}, true);
  var filename = context.dir + '/' + filename;
  $.getJSON(OC.filePath('files_irods', 'ajax', 'getMeta.php'),
            {source:filename},
            function(data, status, xhr) {
              $('.oc-dialog-content').html(data.data);
              $(".oc-dialog").css("width", "25%");
              $(".oc-dialog").css("left", "40%");
              $('#metadata>tbody>tr>td').editable({
                  type: 'text',
                  url: OC.filePath('files_irods', 'ajax', 'setMeta.php'),
                  params: {source:filename},
                  mode: 'inline',
              });
            });
}

$(document).ready(function() {
  if (typeof FileActions !== "undefined") {
    FileActions.registerAction({name: 'Metadata',
                                mime: 'all',
                                permissions: OC.PERMISSION_READ,
                                icon: OC.imagePath('core', 'actions/info'),
                                actionHandler: function (filename, context) {
                                  showModal(filename, context);
                                },
    });
  }
});
