$('#postEdit').on('click', async function (event) {
  event.preventDefault();
  const postTitle = $('#postTitle').val();
  const postBody = $('#postBody').val();
  const postId = $('#editModal').data('postid');
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: postTitle, body: postBody }),
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
});

$('#postDelete').on('click', async function (event) {
  event.preventDefault();
  const postId = $('#editModal').data('postid');
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE'
  });
  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
});
