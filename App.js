import React, { useState } from 'react';
import './App.css';
const initialFormData = {
firstName: '',
lastName: '',
surname:'',
username:'',
email: '',
mobilenumber:'',
address: '',
password: '',
confirmPassword: '',
};
function App() {
const [formData, setFormData] = useState(initialFormData);
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const [confirmPasswordError, setConfirmPasswordError] = useState(false);
const [registeredFullName, setRegisteredFullName] = useState('');
const [showPopup, setShowPopup] = useState(false);
const [acceptTerms, setAcceptTerms] = useState(false);
const handleChange = (e) => {
const { name, value, checked } = e.target;
const newValue = e.target.type === 'checkbox' ? checked : value;
setFormData({ ...formData, [name]: newValue });
if (name === 'confirmPassword') {
setConfirmPasswordError(value !== formData.password);
} else {
setConfirmPasswordError(false);
}
};
const handleSubmit = (e) => {
e.preventDefault();
if (formData.password !== formData.confirmPassword) {
setConfirmPasswordError(true);
return;
}
if (!acceptTerms) {
alert('Please accept the terms and conditions.');
return;
}
// Validation logic and form submission
const fullName = `${formData.firstName} ${formData.lastName}`;
setRegisteredFullName(fullName);
setShowPopup(true);
};
const togglePasswordVisibility = () => {
setShowPassword(!showPassword);
};
const toggleConfirmPasswordVisibility = () => {
setShowConfirmPassword(!showConfirmPassword);
};
const resetForm = () => {
setFormData(initialFormData);
setShowPassword(false);
setShowConfirmPassword(false);
setConfirmPasswordError(false);
setAcceptTerms(false);
};
return (
<div className="App">
<fieldset className="form-box">
<legend><span role="img" aria-label="lock">🔒</span>
Registration Form</legend>
<form onSubmit={handleSubmit}>
<div className="form-group">
<input
type="text"
name="firstName"
placeholder="First Name"
value={formData.firstName}
onChange={handleChange}
required
/>
</div>
<div className="form-group">
<input
type="text"
name="lastName"
placeholder="Last Name"
value={formData.lastName}
onChange={handleChange}
required
/>
</div>
<div className="form-group">
<input
type="text"
name="surname"
placeholder="surname"
value={formData.surname}
onChange={handleChange}
required
/>
</div>
<div className="form-group">
<input
type="text"
name="username"
placeholder="username"
value={formData.username}
onChange={handleChange}
required
/>
</div>
<div className="form-group">
<input
type="email"
name="email"
placeholder="Email"
value={formData.email}
onChange={handleChange}
required
/>
</div>
<div className="form-group">
<input
type="text"
name="mobilenumber"
placeholder="mobilenumber"
value={formData.mobilenumber}
onChange={handleChange}
required
/>
</div>
<div className="form-group">
<input
type="text"
name="address"
placeholder="Address"
value={formData.address}
onChange={handleChange}
required
/>
</div>
<div className="form-group">
<input
type={showPassword ? "text" : "password"}
name="password"
placeholder="Password"
value={formData.password}
onChange={handleChange}
required
/>
<span className="eye-icon"
onClick={togglePasswordVisibility}>
{showPassword ? <i className="fa fa-eye-slash"></i> : 
<i className="fa fa-eye"></i>}
</span>
</div>
<div className="form-group">
<input
type={showConfirmPassword ? "text" : "password"}
name="confirmPassword"
placeholder="Confirm Password"
value={formData.confirmPassword}
onChange={handleChange}
required
/>
<span className="eye-icon"
onClick={toggleConfirmPasswordVisibility}>
{showConfirmPassword ? <i className="fa fa-eyeslash"></i> : <i className="fa fa-eye"></i>}
</span>
{confirmPasswordError && <p className="errormessage">Passwords do not match</p>}
</div>
<div className="form-group">
<label>
<input
type="checkbox"
name="acceptTerms"
checked={acceptTerms}
onChange={() => setAcceptTerms(!acceptTerms)}
required
/>
I accept the terms and conditions
</label>
</div>
<button type="submit">Submit</button>
</form>
</fieldset>
{showPopup && (
<div className="popup">
<div className="popup-content">
<h2>Registration Successful!</h2>
<p>Your account has been successfully registered, 
{registeredFullName}!</p>
<button onClick={() => { setShowPopup(false); 
resetForm(); }}>Close</button>
</div>
</div>
)}
</div>
);
}
export default App;