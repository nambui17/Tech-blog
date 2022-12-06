const newPostHandler = async (event) => {
  event.preventDefault();
  const postTitle = document.querySelector('#postTitle').value.trim();
  const postBody = document.querySelector('#postBody').value.trim();
  if (postTitle && postBody) {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title: postTitle, body: postBody }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

document.querySelector('#postCreate').addEventListener('click', newPostHandler);
