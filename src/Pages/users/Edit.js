import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Header } from '../../layouts/Header';
import { Footer } from '../../layouts/Footer';
import { Button, Input } from 'reactstrap';

export const Edit = () => {
  const [firstname, setFirstName] = useState('Saurin');
  const [lastname, setLastName] = useState('Thakkar');
  const [emailAddress, setEmailAddress] = useState('sthakkar@codal.com');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('Codal Systems');
  const [note, setNote] = useState('Notes for code');
  const [status, setStatus] = useState('');
  const [emptyFirstName, setEmptyFirstName] = useState(false);
  const [emptyLastName, setEmptyLastName] = useState(false);
  const [emptyEmail, setEmptyEmail] = useState(false);

  const { state } = useLocation();

  const navigate = useNavigate();

  const backToList = () => {
    navigate('/users');
  };

  const createUser = () => {
    if (firstname?.length === 0) {
      setEmptyFirstName(true);
    } else if (lastname?.length === 0) {
      setEmptyLastName(true);
    } else if (emailAddress?.length === 0) {
      setEmailAddress(true);
    } else {
      setEmptyFirstName(false);
      setEmptyLastName(false);
      setEmptyEmail(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow rounded-md bg-gray-50 px-[100px] pb-5 min-h-screen flex flex-col">
        <div className="mt-4 mb-3 bg-gray-400 h-14 rounded">
          <div className="py-3 pl-5">
            <Link to="/dashboard">Dashboard</Link>&nbsp;/ &nbsp;
            <Link to="/users">Users</Link>&nbsp;/ &nbsp;
            <Link className="text-black no-underline">Edit</Link>
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
                      First Name<span class="required">*</span>
                    </label>
                    <Input
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                    {emptyFirstName && <div class="invalid-feedback">Required</div>}
                  </div>
                  <div className="fname-lname-label-input-container w-1/2 pr-3 py-2">
                    {' '}
                    <label className="py-2">
                      Last Name<span class="required">*</span>
                    </label>
                    <Input
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="invalid-input adduser-address"
                    />
                    {emptyLastName && <div class="invalid-feedback">Required</div>}
                  </div>
                </div>
                <div className="fname-lname-label-input-container width-100 padding-right-10">
                  <label className="py-2">
                    Email Address<span class="required">*</span>
                  </label>
                  <Input
                    type="text"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    required
                    className="invalid-input adduser-address"
                  />
                  {emptyEmail && <div class="invalid-feedback">Required</div>}
                </div>
                <div className="flex flex-col pb-2">
                  <label className="py-2">
                    Gender<span class="required">*</span>
                  </label>
                  <div className="btn-group w-1/3">
                    <Button className="active">Male</Button>
                    <Button>Female</Button>
                    <Button>Other</Button>
                    <Button>Dont want to disclose</Button>
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
                <div className="fname-lname-label-input-container width-100 pr-10 pb-2">
                  <label className="py-2">Note</label>
                  <textarea
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="h-16 rounded-m adduser-address"
                  />
                </div>
                <div className="fname-lname-label-input-container width-100 pr-10 pb-2">
                  <label className="py-2">
                    Status<span class="required">*</span>
                  </label>
                  <div className="btn-group w-1/4">
                    <Button className="active">Active</Button>
                    <Button>Inactive</Button>
                  </div>
                </div>
                <div className="submit-container">
                  <button>Add</button>
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
