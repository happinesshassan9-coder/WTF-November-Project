// templates/community/community.js
window.Community = (function(){
  function init(user){
    // personalize avatar initials
    const initials = (user?.name || 'HH').split(' ').map(s => s[0]).join('').toUpperCase().slice(0,2);
    const input = document.getElementById('community-input');
    const postBtn = document.getElementById('community-post');
    const list = document.getElementById('community-list');

    postBtn?.addEventListener('click', () => {
      const text = input.value.trim();
      if (!text) return;
      const post = document.createElement('div');
      post.className = 'post';
      post.innerHTML = `
        <div class="meta">
          <div class="avatar">${escapeHtml(initials)}</div>
          <strong>${escapeHtml(user?.name || 'User')}</strong>
          <span class="muted">${escapeHtml(user?.email || '')}</span>
        </div>
        <div>${escapeHtml(text)}</div>
      `;
      list.insertBefore(post, list.firstChild);
      input.value = '';

      // simple AI reply if mention
      if (/@comsq/i.test(text)){
        const ai = document.createElement('div');
        ai.className = 'post';
        ai.innerHTML = `
          <div class="meta">
            <div class="avatar">AI</div>
            <strong>Comsq AI</strong>
            <span class="badge">AI Assistant</span>
          </div>
          <div class="muted">Thanks for the mention! Focus your efforts on high-impact tasks today. What’s your top priority?</div>`;
        list.insertBefore(ai, list.firstChild);
      }
    });
  }

  function escapeHtml(s){
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  return { init };
})();
