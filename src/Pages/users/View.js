import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button, Input, Table } from 'reactstrap';

export const View = () => {
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
            <Link className="text-black no-underline">View</Link>
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
              <Table bordered hover>
                {/* <thead></thead> */}
                <tbody>
                  <tr>
                    <th>First Name</th>
                    <td>Saurin</td>
                  </tr>
                  <tr>
                    <th scope="row">Last Name</th>
                    <td>Thakkar</td>
                  </tr>
                  <tr>
                    <th scope="row">Email</th>
                    <td>
                      <Link className="underline text-blue-600">sthakkar@codal.com</Link>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Gender</th>
                    <td>Male</td>
                  </tr>
                  <tr>
                    <th scope="row">Age</th>
                    <td>26</td>
                  </tr>
                  <tr>
                    <th scope="row">Address</th>
                    <td>A-202,Shree Ram kunj Complex,near arvind marg,nana bazaar,ananad</td>
                  </tr>
                  <tr>
                    <th scope="row">Note</th>
                    <td>Residential Address</td>
                  </tr>
                  <tr>
                    <th scope="row">Created At</th>
                    <td>08/08/2023</td>
                  </tr>
                  <tr>
                    <th scope="row">Updated At</th>
                    <td>08/08/2023</td>
                  </tr>
                  <tr>
                    <th scope="row">Status</th>
                    <td>Active</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <span className="flex w-1/5 justify-between">
                        <button className="btn btn-outline-secondary">
                          <i class="fa fa-pencil fa-xs me-2"></i>Edit
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          <i class="fa fa-trash me-2"></i>Delete
                        </button>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
