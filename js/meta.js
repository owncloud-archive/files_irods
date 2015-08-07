function loadContent(filename) {
  $.getJSON(OC.filePath('files_irods', 'ajax', 'getMeta.php'),
            {source:filename},
            function(data, status, xhr) {
              $('.oc-dialog-content').html(data.data);
              $(".oc-dialog").css("width", "25%");
              $(".oc-dialog").css("left", "40%");
              var options = {
                  type: 'text',
                  url: OC.filePath('files_irods', 'ajax', 'setMeta.php'),
                  params: {source:filename},
                  mode: 'inline',
                  success: function (response, newValue) {
                    if (response.newId && response.oldId) {
                      $("td[data-pk='" + response.oldId + "']").editable('option', 'pk', response.newId);
                    }
                  }
              };
              $('#metadata>tbody>tr>td').editable(options);
              $('.oc-dialog-content').append('<button id="add-metadata" class="btn btn-primary"><i class="glyphicon glyphicon-plus"></i> Add</button>');
              $("#add-metadata").click(function() {
                var id = Date.now();
                $("#metadata>tbody").append("<tr><td data-name='name' data-pk='"+id+"'>name</td><td data-name='value' data-pk='"+id+"'>value</td><td data-name='units' data-pk='"+id+"'>units</td></tr>");
                $("td[data-pk='" + id + "']").editable(options);
              });
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
