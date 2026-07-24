import { useEffect, useState } from "react";
import { getCustomers } from "./customerAPI";
import type { Customer } from "../../types/customer";

export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.customers);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Customers</h1>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Business</th>
            <th>GST Number</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.customerName}</td>
              <td>{customer.email}</td>
              <td>{customer.mobile}</td>
              <td>{customer.businessName}</td>
              <td>{customer.gstNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}