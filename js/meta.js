function remove(filename, id) {
  console.log("Delete "+id);
  $("table#metadata>tbody>tr>td.editable[data-pk='"+id+"']").parent().remove();
  $.post(OC.filePath('files_irods', 'ajax', 'setMeta.php'),
         {source:filename, delete:true, pk: id});
}

function loadContent(filename) {
  $.getJSON(OC.filePath('files_irods', 'ajax', 'getMeta.php'),
            {source:filename},
            function(data, status, xhr) {
              $('.oc-dialog-content').html(data.data);
              $(".oc-dialog").css("width", "80%");
              $(".oc-dialog").css("left", "13%");
              var options = {
                  type: 'text',
                  url: OC.filePath('files_irods', 'ajax', 'setMeta.php'),
                  params: {source:filename},
                  mode: 'inline',
                  success: function (response, newValue) {
                    if (response.newId && response.oldId) {
                      console.log("Updating pk from "+response.oldId+" to "+response.newId);
                      $("table#metadata>tbody>tr>td.editable[data-pk='" + response.oldId + "']").attr('data-pk', response.newId);
                      $("table#metadata>tbody>tr>td>button.remove-metadata[data-pk='" + response.oldId + "']").attr('data-pk', response.newId);
                      $("table#metadata>tbody>tr>td.editable[data-pk='" + response.newId + "']").editable('option', 'pk', response.newId);
                    }
                  }
              };
              $('table#metadata>tbody>tr>td.editable').editable(options);
              $('table#metadata>tbody>tr>td>button.remove-metadata').click(function() {
                remove(filename, $(this).attr('data-pk'));
              });
              $('.oc-dialog-content').append('<button class="add-metadata btn btn-primary"><i class="glyphicon glyphicon-plus"></i> Add</button>');
              $(".add-metadata").click(function() {
                var id = Date.now();
                $("table#metadata>tbody").append("<tr><td class='editable' data-name='name' data-pk='"+id+"'>name</td><td class='editable' data-name='value' data-pk='"+id+"'>value</td><td class='editable' data-name='units' data-pk='"+id+"'>units</td><td><button class='btn btn-danger remove-metadata' data-pk='"+id+"'><i class='glyphicon glyphicon-remove'></i> Remove</button></td></tr>");
                $("td[data-pk='" + id + "'].editable").editable(options);
                $("table#metadata>tbody>tr>td>button.remove-metadata[data-pk='"+id+"']").click(function() {
                  remove($(this).attr('data-pk'));
                });
              });
              $('.oc-dialog-content').append('<button class="refresh-metadata btn btn-primary"><i class="glyphicon glyphicon-refresh"></i> Refresh</button>');
              $(".refresh-metadata").click(function() {
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
