function loadContent(filename) {
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
              $('.oc-dialog-content').append('<button id="add-metadata" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> Add</button>');
              $('.oc-dialog-content').append('<button id="refresh-metadata" class="btn btn-primary"><i class="glyphicon glyphicon-refresh"></i> Refresh</button>');
              $("#refresh-metadata").click(function() {
                $('.oc-dialog-content').html("Loading...");
                loadContent(filename);
              });
            });
}

function showModal(filename, context) {
  OC.dialogs.info("Loading...", 'Metadata for ' + filename, function() {}, true);
  var filename = context.dir + '/' + filename;
  loadContent(filename);
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
