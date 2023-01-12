import { useState } from "react";
import { useMutation } from "@apollo/client";

import { GET_PROJECT } from "../../graphql/queries/projectQueries";
import { UPDATE_PROJECT } from "../../graphql/mutations/projectMutations";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ type, project }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  // const { id } = useParams();

  const deadlineString = deadline.toDateString();
  const startDateString = startDate.toDateString();

  // const { loading, error, data } = useQuery(GET_PROJECT, {
  //   variables: { id },
  // });

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: { id: project.id },
    refetchQueries: [
      { query: GET_PROJECT, variables: { id: project.id } },
    ],
  });

  const handleDateSelect = () => {
    if (type === "DEADLINE") {
      updateProject(deadlineString);
    } else if (type === "STARTDATE") {
      updateProject(startDateString);
    }
  };

  const handleOnChange = (date) => {
    if (type === "DEADLINE") {
      setDeadline(date);
    } else if (type === "STARTDATE") {
      setStartDate(date);
    }
  }

  return (
    <DatePicker
      onSelect={handleDateSelect}
      selected={deadline}
      onChange={handleOnChange}
    />
  );
};

export default DatePickerComponent;
