export default function Course({courses}) {

    return (
        <>
            {courses.map((course) => {
                    const total = course.parts.reduce(
                        (acc, curr) => acc + curr.exercises,
                        0
                    );

                    return (
                        <div key={course.id}>
                            <Header course={course.name} />
                            <Content parts={course.parts} />
                            <Total total={total}/>
                        </div>
                    );
                })
            }
        </>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
);

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>

  //{props.part.name}
)

const Total = (props) => <p><strong>total of {props.total} exercises </strong></p>