import { ObjectSchema } from 'yup';
import useModal from '../../../utils/hooks/useModal';
import { validateYupSchema } from '../../../utils/validation/validateYupSchema';
import CancelButton from '../../CancelButton/CancelButton';
import ConfirmButton from '../../ConfirmButton/ConfirmButton';
import s from './CardForm.module.css';
import { useState, ChangeEvent, FormEvent } from 'react';
import { ICardFormValues } from '../../../utils/validation/editCardSchema';
import { IoCreate } from 'react-icons/io5';
type CardFormProps<T> = {
  initialValues: T;
  schema: ObjectSchema<ICardFormValues>;
  onSubmit: (values: T) => void;
  isEdit?: boolean;
};

const CardForm = <TCard extends { title: string; description?: string }>({
  initialValues,
  schema,
  onSubmit,
  isEdit = false,
}: CardFormProps<TCard>) => {
  const [card, setCard] = useState<TCard>(initialValues);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const { handleClose } = useModal();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCard((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors({});
  };

  const onHandleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmed = {
      ...card,
      title: card.title?.trim(),
      description: card.description?.trim() ?? '',
    };

    const { isValid, errors } = await validateYupSchema(schema, trimmed);

    if (isValid) {
      await onSubmit(trimmed as TCard);
      setCard(initialValues);
      setErrors({});
      handleClose();
    } else {
      setErrors(errors);
    }
  };

  return (
    <form onSubmit={onHandleSubmit} className={s.form}>
      <h3 className={s.edit}>{isEdit ? 'Edit card:' : 'Add new card:'}</h3>

      <label htmlFor="title" className={s.label}>
        Title:
      </label>
      <input
        id="title"
        value={card.title ?? ''}
        onChange={handleChange}
        name="title"
        className={s.input}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Type title here..."
      />
      {errors.title && <p className={s.error}>{errors.title}</p>}

      <label htmlFor="description" className={s.label}>
        Description:
      </label>
      <textarea
        rows={4}
        id="description"
        value={card.description ?? ''}
        onChange={handleChange}
        name="description"
        className={s.input}
        autoComplete="off"
        placeholder="Type description here..."
      />
      {errors.description && <p className={s.error}>{errors.description}</p>}

      <div className={s.wrap}>
        <ConfirmButton Icon={IoCreate} text={isEdit ? 'Save' : 'Create'} />
        <CancelButton />
      </div>
    </form>
  );
};

export default CardForm;
