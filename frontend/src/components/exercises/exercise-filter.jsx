import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import exerciseService from "../../services/exercise.service"
import { isEqual } from "lodash";

export default function ExerciseFilter({setFilter, defaultValues}) {
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([]) 
  const [equipment, setEquipment] = useState([]) 
  const [muscles, setMuscles] = useState([]) 
  const {register, handleSubmit, setValue} = useForm({defaultValues})

  useEffect(() => {
    register({name: "searchName"})
    register({name: "category"})
    register({name: "equipment"})
    register({name: "muscle"})
    
    const getOptions = async () => {
      const allOption = [{key: 0, value: 0, text: "All"}]
      setLoading(true)
      setCategories(allOption.concat(await exerciseService.categories()))
      setEquipment(allOption.concat(await exerciseService.equipment()))
      setMuscles(allOption.concat(await exerciseService.muscles()))
      setLoading(false)
    }
    getOptions()

  }, [register])

  const OnSubmit = filter => {
    setFilter(prevFilter => (isEqual(prevFilter, filter)) ? prevFilter : filter)
  }
  const submit = handleSubmit(OnSubmit)
  const OnChange = (e, {name, value}) => {
    setValue(name, value)
    submit(e)
  }
  return (
    <Form>
      <Form.Group inline>
        <Form.Field>
          <label>Search:</label>
          <Form.Input defaultValue={defaultValues.search} name="searchName" placeholder="Search..." onChange={OnChange}  />
        </Form.Field>
        <Form.Field>
          <label>Category:</label>
          <Form.Select defaultValue={defaultValues.category} name="category" options={categories} onChange={OnChange} loading={loading} />
        </Form.Field>
        <Form.Field>
          <label>Equipment:</label>
          <Form.Select defaultValue={defaultValues.equipment} name="equipment" options={equipment} onChange={OnChange} loading={loading} />
        </Form.Field>
        <Form.Field>
          <label>Muscle:</label>
          <Form.Select defaultValue={defaultValues.muscle} name="muscle" options={muscles} onChange={OnChange} loading={loading} />
        </Form.Field>
      </Form.Group>
    </Form>
  );
}
