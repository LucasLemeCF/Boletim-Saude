import { FaTrashAlt } from "react-icons/fa";
import { Button } from "../../../components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../../../components/ui/dialog';

export function CardExcluirEspecialidade({session, setLoading, fetchData, field}) {
    const excluir = () => {
        if (session) {
          const excluir = async () => {
            setLoading(true);
            try {
              await fetch(process.env.NEXT_PUBLIC_API_INTERNAL + '/api/especialidade/' + field.id, {
                method: "DELETE",
                headers: {
                  authorization: session?.user.token
                },
              }); 
            } catch (error) {
              console.error('Error fetching data:', error);
            } finally {
              fetchData();
              setLoading(false);
            }
          };
          
          excluir();
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <FaTrashAlt/>
            </DialogTrigger>
            <DialogContent className="w-[400px] mt-4 flex flex-col justify-center">
                <DialogHeader>
                    <DialogTitle className="text-center text-xl">Tem certeza que deseja excluir a especialidade {field.especialidade}?</DialogTitle>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="border border-black hover:bg-black/10 rounded-[6px]">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button type="button" className="bg-red-600 hover:bg-red-700 rounded-[6px] text-white" onClick={() => excluir()}>
                        Excluir
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}