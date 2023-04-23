import { useCallback, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import styles from './taskInput.module.scss'
import { TodoTypes } from '../../PropTypes/todo.proptype'
import connect from '../../HOC/connect'
import { debug, log } from '../../constant'
import Title from '../Title'

interface TaskInputProps {
  addTodo: (name: string) => void
  editTodo: (name: string) => void
  finishEditTodo: () => void
  currentTodo: Todo | null
}

function TaskInput(props: TaskInputProps & typeof injectedProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo, debug, log } = props
  const [name, setName] = useState<string>('')

  log('Đây là debug của bài Higher Order Component (HOC): ' + debug)

  const address = useMemo(() => {
    return {
      street: '10 Tran Hung Dao'
    }
  }, [])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      addTodo(name)
      setName('')
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTodo) {
      editTodo(value)
    } else {
      setName(value)
    }
  }

  /**
   * useCallback() vaf useMemo() là 2 hook có tính năng hầu như là giống nhau
   * Nhưng useCallback() được sinh ra là để dùng cho function
   * Còn useMemo() được dùng sử dụng trong biến
   */

  // Cách 1: Sử dụng Hook useCallback()
  const handleClickTitle = useCallback((value: any) => {
    console.log(value)
  }, [])

  // Cách 2: Sử dụng Hook useMemo()
  // const handleClickTitle = useMemo(() => {
  //   return (value: any) => {
  //     console.log(value)
  //   }
  // }, [])

  return (
    <div className='mb-2'>
      <Title address={address} handleClickTitle={handleClickTitle} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='caption goes here'
          value={currentTodo ? currentTodo.name : name}
          onChange={onChangeInput}
        />
        <button type='submit'>{currentTodo ? '✔️' : '➕'}</button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])])
}

const injectedProps = { debug: debug, log: log }
export default connect(injectedProps)(TaskInput)