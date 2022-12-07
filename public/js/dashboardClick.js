$('.post').on('click', async function (event) {
  event.preventDefault();
  const response = await fetch(`/dashboard/posts/${$(this).data('postid')}`, {
    method: 'GET',
  });
  if (response.ok) {
    document.location.replace(`/dashboard/posts/${$(this).data('postid')}`);
  } else {
    alert(response.statusText);
  }
});
