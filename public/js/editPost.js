$('#postEdit').on('click', async function (event) {
  event.preventDefault();
  console.log($('#postTitle').val());
  const postTitle = $('#postTitle').val();
  const postBody = $('#postBody').val();
  const id = $('.card').data('postid');
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: postTitle, body: postBody })
  });
  if (response.ok) {
    document.location.replace(`/dashboard/posts/${id}`);
  } else {
    alert(response.statusText);
  }
});
