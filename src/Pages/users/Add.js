import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, FormFeedback } from 'reactstrap';
import { getAge } from '../../utils/modules';
import * as faker from '@faker-js/faker';

export const Add = () => {
  // const initialValues = { firstname: "",lastname:"",};
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [gender, setGender] = useState('male');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('active');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isActiveGender, setIsActiveGender] = useState(1);
  const [isActiveStatus, setIsActiveStatus] = useState(1);

  const navigate = useNavigate();

  const backToList = () => {
    navigate('/users');
  };

  const createUser = (e) => {
    e.preventDefault();
    setSubmitted(true);

    validate();
    if (
      Object.keys(errors).length === 0 &&
      firstName.length > 0 &&
      emailAddress.length > 0 &&
      lastName.length > 0
    ) {
      const tempUsers = JSON.parse(localStorage.getItem('STUSERS'));
      const sampleDate = new Date('January 1, 2000 23:15:30 UTC').toJSON();
      tempUsers.unshift({
        address,
        age: getAge(sampleDate),
        createdAt: sampleDate,
        email: emailAddress,
        firstName: firstName,
        gender,
        id: faker.faker.datatype.uuid(),
        lastName: lastName,
        note,
        status,
        updatedAt: new Date().toJSON()
      });
      //To do :- add toast message for createUser
      console.log('LC', tempUsers);
      localStorage.setItem('STUSERS', JSON.stringify(tempUsers));
    }
  };

  const validate = useCallback(() => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (submitted) {
      if (firstName.length === 0) {
        errors.firstName = 'Empty Username';
      }
      if (lastName.length === 0) {
        errors.lastName = 'Empty lastname';
      }

      if (emailAddress.length === 0) {
        errors.emailAddress = 'Empty Email';
      } else if (!regex.test(emailAddress)) {
        errors.emailAddress = 'Invalid Email';
      }
    }
    setErrors(errors);
  }, [emailAddress, firstName, lastName, submitted]);

  useEffect(() => {
    validate();
  }, [emailAddress, firstName, lastName, submitted, validate]);

  const setGenderFromButton = (e, id) => {
    setIsActiveGender(id);
    setGender(e.target.innerText.toLowerCase());
  };

  const setStatusFromButton = (e, id) => {
    setIsActiveStatus(id);
    setStatus(e.target.innerText);
  };
  const genderButtonNames = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Other' },
    { id: 4, name: "Don't want to disclose" }
  ];

  const statusButtonNames = [
    { id: 1, name: 'Active' },
    { id: 2, name: 'Inactive' }
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow rounded-md bg-gray-50 px-[100px] pb-5 min-h-screen flex flex-col">
        <div className="mt-4 mb-3 bg-gray-400 h-14 rounded">
          <div className="py-3 pl-5">
            <Link to="/dashboard">Dashboard</Link>&nbsp;/ &nbsp;
            <Link to="/users">Users</Link>&nbsp;/ &nbsp;
            <Link className="text-black no-underline">Add</Link>
          </div>
        </div>
        <div className="mt-4 mb-0 font-bold flex justify-between">
          <h1 className="text-4xl">Users</h1>
          <Button onClick={backToList}>
            <i class="fa fa-arrow-left fa-xs" style={{ paddingRight: '10px' }}></i>
            Back to List
          </Button>
        </div>
        <div className="flex-grow mt-10 mb-0 flex flex-col">
          <div className="border-gray-200 border-2 rounded flex flex-col bg-white">
            <div className="rounded ml-7 my-6 mr-[28px]">
              <form onSubmit={createUser}>
                <div className="w-full flex">
                  <div className="fname-lname-label-input-container w-1/2 pr-3 py-2">
                    <label className="py-2">
                      First Name&nbsp;<span class="required">*</span>
                    </label>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      invalid={errors?.firstName}
                    />

                    <FormFeedback class="invalid-feedback">{errors?.firstName}</FormFeedback>
                  </div>
                  <div className="fname-lname-label-input-container w-1/2 pr-3 py-2">
                    {' '}
                    <label className="py-2">
                      Last Name&nbsp;<span class="required">*</span>
                    </label>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="invalid-input"
                      invalid={errors?.lastName}
                    />
                    <FormFeedback class="invalid-feedback">{errors?.lastName}</FormFeedback>
                  </div>
                </div>
                <div className="fname-lname-label-input-container width-100 padding-right-10">
                  <label className="py-2">
                    Email Address&nbsp;<span class="required">*</span>
                  </label>
                  <Input
                    type="text"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="invalid-input"
                    invalid={errors?.emailAddress}
                  />
                  <FormFeedback class="invalid-feedback">{errors?.emailAddress}</FormFeedback>
                </div>
                <div className="flex flex-col pb-2">
                  <label className="py-2">
                    Gender&nbsp;<span class="required">*</span>
                  </label>

                  <div className="btn-group w-1/3">
                    {genderButtonNames.map((button) => {
                      return (
                        <Button
                          key={button.id}
                          onClick={(e) => setGenderFromButton(e, button.id)}
                          active={isActiveGender === button.id}
                        >
                          {button.name}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <div className="fname-lname-label-input-container width-100 pr-3 pb-2">
                  <label className="py-2">Address</label>
                  <textarea
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-16 rounded-md adduser-address"
                  />
                </div>
                <div className="fname-lname-label-input-container width-100 pr-3 pb-2">
                  <label className="py-2">Note</label>
                  <textarea
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="h-16 rounded-md adduser-address"
                  />
                </div>
                <div className="fname-lname-label-input-container width-100 pr-10 pb-2">
                  <label className="py-2">
                    Status&nbsp;<span class="required">*</span>
                  </label>
                  <div className="btn-group w-1/5">
                    {statusButtonNames.map((button) => (
                      <Button
                        key={button.id}
                        onClick={(e) => setStatusFromButton(e, button.id)}
                        active={isActiveStatus === button.id}
                      >
                        {button.name}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="submit-container">
                  <Button type="submit">Add</Button>
                  <button>
                    <i class="fa fa-random" style={{ paddingRight: '10px' }}></i>
                    Random Data
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
