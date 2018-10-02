import memoize from 'lru-memoize'
import { createValidator, required, minLength } from 'common/utils/validation'

const validator = createValidator({
  firstName: [required, minLength(8)],
  lastName: [required, minLength(8)],
})

export default memoize(10)(validator)
