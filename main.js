$( document ).ready(function() {
  //Start with three disk
  let disks = 3;

  for (let i = 0; i < disks; i++) {
    $('.left').append(`<div class="disk disk${i}" data-value="${i}"></div>`);

    //Make disks draggable
    let disk = $(`.disk${i}`);

    makeDraggable(disk);
  }

  function makeDraggable(element) {
    element.draggable({
      containment: '.content',
      helper: 'clone',

      start: function() {
        //Disable "plus" and "less" buttons while playing
        $('.add').prop('disabled', true);
        $('.remove').prop('disabled', true);
        //Only the top disk can be moved
        if ($(this)[0] === $(this).parent().children().first()[0]) {
          $(this).hide();
          return true;
        } else {
          return false;
        }
      },
      stop: function() {
        $(this).show();
      }
    })
  }

  //Click "plus" sign to add disks
  $('.add').on('click', addDisks);

  function addDisks() {
    if (disks < 6) {
      $('.left').append(`<div class="disk disk${disks}" data-value="${disks}"></div>`);

      //Make new disks draggable
      let disk = $(`.disk${disks}`);

      makeDraggable(disk);

      disks++;
    }
  }

  //Click "less" sign to remove disks
  $('.remove').on('click', removeDisks);

  function removeDisks() {
    if (disks > 3) {
      disks--;

      $(`.disk${disks}`).remove();
    }
  }

  let moves = 0;

  //Make posts droppable
  $('.post').droppable({
    tolerance: 'touch',
    drop: function(event, ui) {
      if ($(this).children().length === 0 || $(ui.draggable).attr('data-value') < $(this).children().first().attr('data-value')) {
        $(this).prepend(ui.draggable);
        moves++;
        $('.moves').text(moves);

        if ($('.right').children().length === disks) {
          $(this).children().draggable('disable');
        }
      }
    }
  })

  ///Click "reset" to reset screen
  $('.reset').on('click', function() {
    window.location.reload();
  })
});
