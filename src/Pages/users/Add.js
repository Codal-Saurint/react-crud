import { useNavigate, Link } from 'react-router-dom';
import { Button, Input, FormFeedback } from 'reactstrap';
import { getAge } from '../../modules/helper';
import * as faker from '@faker-js/faker';
import { useFormik } from 'formik';
import * as yup from 'yup';

export const Add = () => {
  const navigate = useNavigate();

  const backToList = () => {
    navigate('/users');
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().required('FirstName field is empty'),
    lastName: yup.string().required('LastName field is empty'),
    email: yup
      .string()
      .required('Email Address field is empty')
      .email('You have entered invalid email format')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      gender: 'male',
      address: '',
      note: '',
      status: 'active'
    },
    validationSchema,
    onSubmit: (data) => {
      const tempUsers = JSON.parse(localStorage.getItem('STUSERS'));
      const sampleDate = new Date('January 1, 2000 23:15:30 UTC').toJSON();
      tempUsers.unshift({
        age: getAge(sampleDate),
        createdAt: sampleDate,
        id: faker.faker.datatype.uuid(),
        updatedAt: new Date().toJSON(),
        ...data
      });
      localStorage.setItem('STUSERS', JSON.stringify(tempUsers));
      console.log('ss', tempUsers);
      navigate('/users');
    }
  });
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
              <form onSubmit={formik.handleSubmit}>
                <div className="w-full flex">
                  <div className="fname-lname-label-input-container w-1/2 pr-3 py-2">
                    <label className="py-2">
                      First Name&nbsp;<span class="required">*</span>
                    </label>
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

                    <FormFeedback className="invalid-feedback">
                      {formik.errors.firstName && formik.touched.firstName
                        ? formik.errors.firstName
                        : null}
                    </FormFeedback>
                  </div>
                  <div className="fname-lname-label-input-container w-1/2 pr-3 py-2">
                    {' '}
                    <label className="py-2">
                      Last Name&nbsp;<span class="required">*</span>
                    </label>
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
                    <FormFeedback className="invalid-feedback">
                      {formik.errors.lastName && formik.touched.lastName
                        ? formik.errors.lastName
                        : null}
                    </FormFeedback>
                  </div>
                </div>

                <div className="fname-lname-label-input-container width-100 padding-right-10">
                  <label className="py-2">
                    Email Address&nbsp;<span class="required">*</span>
                  </label>
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
                  <FormFeedback className="invalid-feedback">
                    {formik.errors.email && formik.touched.email ? formik.errors.email : null}
                  </FormFeedback>
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
                          onClick={() => formik.setFieldValue('gender', button.name.toLowerCase())}
                          active={formik.values.gender === button.name.toLowerCase()}
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
                <div className="fname-lname-label-input-container width-100 pr-3 pb-2">
                  <label className="py-2">Note</label>
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
                <div className="fname-lname-label-input-container width-100 pr-10 pb-2">
                  <label className="py-2">
                    Status&nbsp;<span class="required">*</span>
                  </label>
                  <div className="btn-group w-1/5">
                    {statusButtonNames.map((button) => (
                      <Button
                        key={button.id}
                        onClick={() => formik.setFieldValue('status', button.name.toLowerCase())}
                        active={formik.values.status === button.name.toLowerCase()}
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
