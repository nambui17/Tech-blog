let commentId;
$('.comment').on('click', async function (event) {
  event.preventDefault();
  const commentBody = $(this).data('commentbody');
  commentId = $(this).data('commentid');
  if ($('#commentModal').data('loggeduser') === $(this).data('commentuser')) {
    $('#post').data('commentid', commentId);
    $('#commentBody').val(commentBody);
    $('#commentModal').modal('toggle');
  }
});

$('#commentEdit').on('click', async function (event) {
  event.preventDefault();
  const commentBody = $('#commentBody').val();
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ body: commentBody }),
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
});

$('#commentDelete').on('click', async function (event) {
  event.preventDefault();
  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
});
