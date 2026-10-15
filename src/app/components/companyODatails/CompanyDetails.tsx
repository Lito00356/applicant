"use client";

const CompanyDetails = ({ onClose }) => {
  return (
    <div className="absolute w-full h-full">
      <button type="button" onClick={onClose}>
        Close
      </button>
      <div>
        <h1>DETAILS</h1>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolorum ab odit enim, dicta consequuntur excepturi at
          quam accusantium velit repellat doloribus in incidunt voluptatem. Quam dignissimos itaque accusantium consequuntur!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolorum ab odit enim, dicta consequuntur excepturi at
          quam accusantium velit repellat doloribus in incidunt voluptatem. Quam dignissimos itaque accusantium consequuntur!
        </p>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum dolorum ab odit enim, dicta consequuntur excepturi at
          quam accusantium velit repellat doloribus in incidunt voluptatem. Quam dignissimos itaque accusantium consequuntur!
        </p>
      </div>
    </div>
  );
};

export default CompanyDetails;
