import Enum from 'enum';

const status = new Enum({ 0: 'New', 1: 'Closed' }, { freez: true });
export default status;
