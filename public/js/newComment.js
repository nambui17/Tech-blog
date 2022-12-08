$('#newCommentSubmit').on('click', async function (event) {
  event.preventDefault();
  const userId = $('#newComment').data('loggeduser');
  const postId = $('#newComment').data('postid');
  const commentBody = $('#newCommentBody').val();
  if (commentBody) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        body: commentBody,
        user_id: userId,
        post_id: postId,
      }),
    });
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
});
