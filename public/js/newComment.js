const newPostHandler = async (event) => {
  event.preventDefault();
  const commentBody = document.querySelector('#postBody').value.trim();
  if (postTitle && postBody) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ body: commentBody }),
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
