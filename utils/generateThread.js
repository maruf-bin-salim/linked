export default function generateThread(id_1, id_2)
{
    return (id_1.localeCompare(id_2) > 0) ? `${id_1}_${id_2}` : `${id_2}_${id_1}`;
}