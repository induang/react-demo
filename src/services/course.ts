export const fetchCoursesData = async () => {
	try {
		const response = await fetch('http://localhost:4000/courses/all');
		if (!response.ok) throw new Error('Get courses failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchAddCourse = async (newCourse) => {
	try {
		const response = await fetch('http://localhost:4000/courses/add', {
			method: 'POST',
			body: JSON.stringify(newCourse),
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response.ok) throw new Error('Add course failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};

export const fetchDeleteCourse = async (courseID) => {
	try {
		const response = await fetch(`http://localhost:4000/courses/${courseID}`, {
			method: 'DELETE',
			headers: {
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response.ok) throw new Error('Delete course failed.');
	} catch (e) {
		alert(e);
	}
};

export const fetchUpdateCourse = async (course) => {
	try {
		const response = await fetch(`http://localhost:4000/courses/${course.id}`, {
			method: 'PUT',
			body: JSON.stringify(course),
			headers: {
				'Content-Type': 'application/json',
				Authorization: window.localStorage.getItem('user_token'),
			},
		});
		if (!response.ok) throw new Error('Update course failed.');
		const res = await response.json();
		return res;
	} catch (e) {
		alert(e);
	}
};