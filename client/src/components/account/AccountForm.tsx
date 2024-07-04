import { FC } from "react";
import { User } from "../../types/User";

interface AccountFormProps {
  userDetails: User;
}

const AccountForm: FC<AccountFormProps> = ({ userDetails }) => {
  return (
    <div className="w-3/4 bg-white shadow-md rounded-lg p-6 mb-8">
      <form>
        <div className="grid grid-cols-1 gap-6 mb-4">
          <div className="flex flex-col mb-4">
            <label className="block text-gray-600 mb-2">Email Address</label>
            <span className="block text-primaryColor text-lg">
              {userDetails.email}
            </span>
          </div>

          {[
            {
              label: "UserName",
              field: "userName",
              value: userDetails.userName,
            },
            {
              label: "First Name",
              field: "firstName",
              value: userDetails.firstName,
            },
            {
              label: "Last Name",
              field: "lastName",
              value: userDetails.lastName,
            },
            { label: "Age", field: "age", value: userDetails.age },
            { label: "Github", field: "github", value: userDetails.github },
          ].map(({ label, field, value }) => (
            <div key={field} className="flex flex-col mb-4">
              <label className="block text-gray-600 mb-2">{label}</label>
              <span className="block text-primaryColor text-lg mb-2">
                {value}
              </span>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default AccountForm;
