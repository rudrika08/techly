import React, { useState } from 'react';
import styles from './EditProfile.module.scss';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      // TODO: handle profile update via backend API call
      alert('Profile updated successfully!');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Edit Profile</h1>
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        <div className={styles.formGroup}>
          <input
            id="name"
            name="name"
            type="text"
            className={`${styles.input} ${formErrors.name ? styles.errorInput : ''}`}
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="name" className={styles.floatingLabel}>Name</label>
          {formErrors.name && <p className={styles.errorMsg}>{formErrors.name}</p>}
        </div>

        <div className={styles.formGroup}>
          <input
            id="email"
            name="email"
            type="email"
            className={`${styles.input} ${formErrors.email ? styles.errorInput : ''}`}
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email" className={styles.floatingLabel}>Email</label>
          {formErrors.email && <p className={styles.errorMsg}>{formErrors.email}</p>}
        </div>

        <div className={styles.formGroup}>
          <textarea
            id="bio"
            name="bio"
            rows="4"
            className={styles.textarea}
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          />
          <label htmlFor="bio" className={styles.floatingLabelTextarea}>Bio</label>
        </div>

        <button type="submit" className={styles.saveButton}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;

