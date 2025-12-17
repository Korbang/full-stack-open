import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

export default function Course({course}) {
    const total = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);

    return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total total={total}/>
    </div>
  )
}