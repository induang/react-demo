export const fetchAddAuthor = async (authorName) => {
	try {
		const response = await fetch('http://localhost:4000/authors/add', {
			method: 'POST',
			body: JSON.stringify({ name: authorName }),
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response.ok) throw new Error('Add author failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchAuthorsData = async () => {
	try {
		const response = await fetch('http://localhost:4000/authors/all');
		if (!response.ok) throw new Error('Get Authors failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};
