$(function () {
    $('.comment').click(function (e) {
        var target = $(e.target);
        var toId = target.data('tid');
        var commentId = target.data('cid');

        if ($('#toId').length > 0) {
            $('#toId').val(toId);
        } else {
            $('<input>').attr({
                type: 'hidden',
                name: 'comment[tid]',
                value: toId
            }).appentTo('#commentForm');
        }

        if ($('#commentId').length > 0) {
            $('#commentId').val(commentId);
        } else {

            $('<input>').attr({
                type: 'hidden',
                name: 'comment[cid]',
                value: commentId
            }).appentTo('#commentForm');
        }
    })

})