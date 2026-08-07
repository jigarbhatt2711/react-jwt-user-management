import {
  FaEye
} from 'react-icons/fa';

const User = ({ user, showDetails }) => {
  return (
    <>
      <td className="px-6 py-4">
        {user.firstName} {user.lastName}
      </td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.age}</td>
      <td className="px-6 py-4">{user?.birthDate}</td>
      <td className="px-6 py-4">
        <button onClick={() => showDetails(user)}>
          <FaEye />
        </button>
      </td>
    </>
  );
};

export default User;
