import { useNavigate, Link, useParams } from 'react-router-dom';
import { Button, Input, FormFeedback } from 'reactstrap';
import { getAge, getRandomUserfromArray } from '../../modules/helper';
import * as faker from '@faker-js/faker';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { genderButtonNames, statusButtonNames } from '../../data/constants';
import React, { useEffect, useState } from 'react';
import { capitalize } from '../../modules/helper';
import { Label } from '../../components/shared/Label';
import { RandomUser } from '../../components/shared/RandomUser';

export const AddEdit = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: 'male',
    address: '',
    note: '',
    status: 'active'
  });

  const backToList = () => {
    navigate('/users');
  };

  useEffect(() => {
    if (id) {
      const tempUsers = JSON.parse(localStorage.getItem('STUSERS'));
      const getUser = tempUsers.find((element) => element.id === id);
      setUser((user) => ({ ...getUser }));
    }
  }, [id, useFormik, setUser]);

  const validationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email('You have entered invalid email format')
  });

  const formik = useFormik({
    initialValues: user,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (data) => {
      if (id) {
        const tempUsers = JSON.parse(localStorage.getItem('STUSERS'));
        if (tempUsers) {
          const userIndex = tempUsers.findIndex((element) => element.id === id);

          if (userIndex !== -1) {
            tempUsers[userIndex] = {
              ...data,
              updatedAt: new Date().toJSON()
            };
          }
          localStorage.setItem('STUSERS', JSON.stringify(tempUsers));
        } else {
          const tempArray = RandomUser(10);
          const tempUser = getRandomUserfromArray(tempArray);
          setUser(tempUser);
          localStorage.setItem('STUSERS', JSON.stringify([tempUser]));
        }
      } else {
        const tempUsers = JSON.parse(localStorage.getItem('STUSERS'));
        const sampleDate = new Date('January 1, 2000 23:15:30 UTC').toJSON();
        if (tempUsers) {
          const newUser = {
            age: getAge(sampleDate),
            createdAt: sampleDate,
            id: faker.faker.datatype.uuid(),
            updatedAt: new Date().toJSON(),
            ...data
          };
          const updatedArray = [newUser, ...tempUsers];
          localStorage.setItem('STUSERS', JSON.stringify(updatedArray));
        } else {
          const tempUser = [
            {
              age: getAge(sampleDate),
              createdAt: sampleDate,
              id: faker.faker.datatype.uuid(),
              updatedAt: new Date().toJSON(),
              ...data
            }
          ];
          localStorage.setItem('STUSERS', JSON.stringify(tempUser));
        }
      }
      navigate('/users');
    }
  });

  const addRandomData = () => {
    const tempArray = RandomUser(10);
    const tempUser = getRandomUserfromArray(tempArray);
    setUser(tempUser);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow rounded-md bg-gray-50 px-[100px] pb-5 min-h-screen flex flex-col">
        <div className="mt-4 mb-3 bg-gray-400 h-14 rounded">
          <div className="py-3 pl-5">
            <Link to="/dashboard">Dashboard</Link>&nbsp;/ &nbsp;
            <Link to="/users">Users</Link>&nbsp;/ &nbsp;
            <Link className="text-black no-underline">{id ? 'Edit' : 'Add'}</Link>
          </div>
        </div>
        <div className="mt-4 mb-0 font-bold flex justify-between">
          <h1 className="text-4xl">{id ? 'Edit User' : 'Add User'}</h1>
          <Button onClick={backToList}>
            <i className="fa fa-arrow-left fa-xs" style={{ paddingRight: '10px' }}></i>
            Back to List
          </Button>
        </div>
        <div className="flex-grow mt-10 mb-0 flex flex-col">
          <div className="border-gray-200 border-2 rounded flex flex-col bg-white">
            <div className="rounded ml-7 my-6 mr-[28px]">
              <form onSubmit={formik.handleSubmit}>
                <div className="w-full flex">
                  <div className="flex flex-col w-1/2 pr-3 py-2">
                    <Label required>First Name</Label>
                    <Input
                      name="firstName"
                      type="text"
                      className={
                        'form-control' +
                        (formik.errors.firstName && formik.touched.firstName ? ' is-invalid' : '')
                      }
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                    />

                    <FormFeedback>
                      {formik.errors.firstName && formik.touched.firstName
                        ? formik.errors.firstName
                        : null}
                    </FormFeedback>
                  </div>
                  <div className="flex flex-col w-1/2 pr-3 py-2">
                    <Label required>Last Name</Label>

                    <Input
                      name="lastName"
                      type="text"
                      className={
                        'form-control' +
                        (formik.errors.lastName && formik.touched.lastName ? ' is-invalid' : '')
                      }
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                    />
                    <FormFeedback>
                      {formik.errors.lastName && formik.touched.lastName
                        ? formik.errors.lastName
                        : null}
                    </FormFeedback>
                  </div>
                </div>

                <div className="flex flex-col w-full pr-2">
                  <Label required>Email</Label>
                  <Input
                    name="email"
                    type="text"
                    className={
                      'form-control' +
                      (formik.errors.email && formik.touched.email ? ' is-invalid' : '')
                    }
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  <FormFeedback>
                    {formik.errors.email && formik.touched.email ? formik.errors.email : null}
                  </FormFeedback>
                </div>
                <div className="flex flex-col pb-2">
                  <Label required>Gender</Label>

                  <div className="btn-group w-1/3">
                    {genderButtonNames.map((button, index) => {
                      return (
                        <Button
                          key={button.id}
                          onClick={() => formik.setFieldValue('gender', button.name.toLowerCase())}
                          active={formik.values.gender === button.name.toLowerCase()}
                          outline
                          color="secondary"
                        >
                          {capitalize(button.name)}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col w-full pr-3 pb-2">
                  <Label>Address</Label>
                  <textarea
                    name="address"
                    type="text"
                    className={
                      'form-control' +
                      (formik.errors.address && formik.touched.address ? ' is-invalid' : '')
                    }
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </div>
                <div className="flex flex-col w-full pr-3 pb-2">
                  <Label>Note</Label>
                  <textarea
                    name="note"
                    type="text"
                    className={
                      'form-control' +
                      (formik.errors.note && formik.touched.note ? ' is-invalid' : '')
                    }
                    onChange={formik.handleChange}
                    value={formik.values.note}
                  />
                </div>
                <div className="flex flex-col w-full pr-10 pb-2 mb-4">
                  <Label required>Status</Label>
                  <div className="rounded-md w-1/5 btn-group">
                    {statusButtonNames.map((button) => (
                      <Button
                        key={button.id}
                        onClick={() => formik.setFieldValue('status', button.name)}
                        active={formik.values.status === button.name}
                        outline
                        color="secondary"
                      >
                        {capitalize(button.name)}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button type="submit" color="primary" className="w-48">
                    {id ? 'Update' : 'Add'}
                  </Button>
                  <Button outline onClick={() => addRandomData()} className="w-48">
                    <i className="fa fa-random" style={{ paddingRight: '10px' }}></i>
                    Random Data
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
