import { reactive } from 'vue'

import http from '../http'
import { FetchMazeResponse, GenerateMazeResponse, Maze, UseMaze } from '../types'

export default function useMaze(): UseMaze {
  const form = reactive({
    height: 15,
    width: 15,
    difficulty: 0,
  })

  const maze = reactive<Maze>({
    uuid: '',
    dimensions: {
      height: 0,
      width: 0,
    },
    positions: {
      domokun: 0,
      end: 0,
      pony: 0,
    },
    structure: [],
  })

  const fetchMaze = async (uuid: string): Promise<Maze> => {
    const { data } = await http.get<FetchMazeResponse>(`/maze/${uuid}`)

    maze.uuid = uuid
    maze.dimensions.height = data.size[1]
    maze.dimensions.width = data.size[0]
    maze.positions.pony = data.pony[0]
    maze.positions.domokun = data.domokun[0]
    maze.positions.end = data['end-point'][0]
    maze.structure = data.data

    return maze
  }

  const generateMaze = async (): Promise<Maze> => {
    const { data } = await http.post<GenerateMazeResponse>('/maze', {
      'maze-player-name': 'Pinkie Pie',
      'maze-height': parseInt(form.height.toString(), 10),
      'maze-width': parseInt(form.width.toString(), 10),
      difficulty: parseInt(form.difficulty.toString(), 10),
    })

    return fetchMaze(data.maze_id)
  }

  return { form, maze, fetchMaze, generateMaze }
}
