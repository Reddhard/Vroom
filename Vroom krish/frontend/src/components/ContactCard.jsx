import './ContactCard.css';

//
//done
//

export function ContactCard({ person, type }) {
  return (
    <>
      <h2>{type} Contact Info</h2>
      <p><strong>Name:</strong> {person.name || "N/A"}</p>
      <p><strong>Mobile:</strong> {person.phone || "N/A"}</p>
    </>
  );
}