import { Box, 
        Flex,
        ListItem,
        UnorderedList,
        Button,
        Input,
        Text  } from '@chakra-ui/react';
import { useState } from 'react'
import { TodoItem } from '../Types/TodoItem';


export const TodoList = ()=>{

    const [itemInput, setItemInput] = useState('');
    const [list, setList] = useState<TodoItem[]>([
        { id: 0, label: 'Comprar ração do gato', checked: false},
        { id: 1, label: 'Fazer carinho no gato', checked: false}
    ])

    const HandleButtonAdd = ()=>{
        if (itemInput.trim() === '') return;
        setList([...list, { id: list.length + 1, label: itemInput, checked: false}]);
        setItemInput('');        
    }

    const deleteItem = (id: number) =>{
        setList(list.filter(item => item.id !== id));
    }

    const toggleItem = (id: number) => {
        setList(list.map(item => {
            if (item.id === id) {
                return { ...item, checked: !item.checked };
            }
            return item;
        }));
    };

    const deleteCheckedItens = () => {
        setList(list.filter(item => !item.checked))
    };
    

    return(
        <Flex  color='white' pt='20' bg='#333333' h='100vh' align='center' justify='start' direction='column'>
            <Box border='2px solid white' p='20px' borderRadius='20px' bg='#191919'>

                <Box fontSize='x-large' mb='20px' textAlign='center' >
                    <h1>Lista de Tarefas</h1>
                </Box>
                
                <Box display='flex' alignItems='center' borderRadius='20px'  mb='20px'>

                    <Input type='text' 
                    placeholder='Adicionar Item:'
                    value={itemInput}
                    onChange={e => setItemInput(e.target.value)}/>

                    <Button
                    marginLeft='10px' h='40px' w='100px'  ml='10px' 
                    onClick={HandleButtonAdd} colorScheme='whatsapp' size='xs'>
                        Adicionar
                    </Button>

                </Box>

                <Box m='15px 0' display='flex' justifyContent='center'>

                    <p>{list.length} Itens na lista</p>

                    <Button ml='50px' size='xs' colorScheme='orange'
                    onClick={deleteCheckedItens}>Deletar Marcados
                    </Button>

                </Box>

                <Box  p='50px' border='2px solid white' >
                    <UnorderedList >

                        {list.map((item) => (
                            <ListItem mt='10px'borderBottom='1px solid white' key={item.id}
                            display='flex' alignItems='center'>

                                <input
                                 onClick={() => toggleItem(item.id)}  
                                 type='checkbox'  checked={item.checked}
                                 onChange={() => toggleItem(item.id)}/>
                                
                                <Text ml='10px' mr='10px'>{item.label} -</Text>   
                                
                                <Button onClick={()=> deleteItem(item.id)} 
                                colorScheme='red' size='xs' marginLeft='auto'>
                                Deletar
                                </Button>

                            </ListItem>

                        ))}
                    </UnorderedList>
                </Box>
            </Box>
        </Flex>
    )
}