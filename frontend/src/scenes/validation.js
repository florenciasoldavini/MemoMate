function validation(loginInfo, targetName) {
    const errors = {};

    if (targetName === 'all') {
        Object.keys(loginInfo).forEach(key => {
            if (!loginInfo[key]) {
                errors[key] = 'This field is required';
                return errors;
            }
        })
    }

    if (!loginInfo[targetName]) {
        errors[targetName] = 'This field is required';
        return errors;
    }

}

export default validation;
