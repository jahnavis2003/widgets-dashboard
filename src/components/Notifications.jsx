import { OutputActivity } from "./Enums";
import { toast } from 'react-toastify';

const notify = (message, status) => {
    const toastMap = {
        [OutputActivity.Success]: toast.success,
        [OutputActivity.Warning]: toast.warning,
        [OutputActivity.Failure]: toast.error,
        [OutputActivity.InProgress]: toast.info,
        [OutputActivity.Empty]: toast,
    };

    (toastMap[status] || toast)(message);
};

export default notify;