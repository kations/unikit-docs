const pages = [
  {
    path: "/box",
    title: "Box",
    from: "Box",
    group: "Primitives",
    smallCode: `<Box bg="primary" w={50} h={50} />`,
    code: `<Box bg="primary" w={50} h={50} />`
  },
  {
    path: "/flex",
    title: "Flex",
    from: "Flex",
    group: "Primitives",
    smallCode: `<Flex row w={160} content="space-between">
      <Box bg="primary" w={50} h={50} />
      <Box bg="primary" opacity={0.5} w={50} h={50} />
    </Flex>`,
    code: ``
  },
  {
    path: "/headline",
    title: "Headline",
    from: "Headline",
    group: "Primitives",
    smallCode: `<Headline>H1</Headline>`,
    code: ``
  },
  {
    path: "/text",
    title: "Text",
    from: "Text",
    group: "Primitives",
    smallCode: `<Text>Text</Text>`,
    code: ``
  },
  {
    path: "/button",
    title: "Button",
    from: "Button",
    group: "UI",
    smallCode: `<Button rounded>Button</Button>`,
    code: `<Flex row wrap content="space-around">
    <Button m={5} bg="surface" onPress={() => alert("hi")}>
      Basic
    </Button>
    <Button m={5} outlined>
      Outlined
    </Button>
    <Button m={5} rounded>
      Rounded
    </Button>
    <Button m={5} progress={77}>
      Progress
    </Button>
    <Button m={5} rounded light>
      Light
    </Button>
    <Button m={5} rounded clean>
      Clean
    </Button>
    <Button m={5} color="error" rounded clean>
      Error
    </Button>
    <Button m={5} rounded light ripple>
      Ripple
    </Button>
  </Flex>;`
  },
  {
    path: "/picker",
    title: "Picker",
    from: "Picker",
    group: "UI",
    smallCode: `<Flex w="80%"><Picker /></Flex>`,
    code: `<Flex><Picker onChange={(value) => console.log({value})} /></Flex>`
  },
  {
    path: "/collapsible",
    title: "Collapsible",
    from: "Collapsible",
    group: "UI",
    smallCode: `<Collapsible w="80%"><Box bg="primary" w={20} h={20} /></Collapsible>`,
    code: `<Flex><Collapsible><Box bg="primary" w={100} h={100} /></Collapsible>
    <Collapsible mt={5}><Box bg="primary" w={100} h={100} /></Collapsible></Flex>`
  },
  {
    path: "/tabs",
    title: "Tabs",
    from: "Tabs",
    group: "UI",
    smallCode: `<Tabs w="80%" options={['Tab 1', 'Tab 2']} />`,
    code: `<Flex align="center">
    <Tabs
      value="Tab 2"
      options={["Tab 1", "Tab 2", "Tab 3"]}
      onChange={value => alert(value)}
    />
    <Tabs
      mt={50}
      options={[
        { label: "Tab 1", value: 0 },
        { label: "Tab 2", value: 1 }
      ]}
      indicatorSize="100%"
      activeColor="#FFF"
      borderRadius={40}
    />
    <Tabs
      bg="transparent"
      vertical
      mt={50}
      options={["Tab 1", "Tab 2", "Tab 3"]}
      tabProps={{ justifyContent: "flex-start" }}
      borderRadius={0}
    />
  </Flex>;
  `
  },
  //   {
  //     path: "/group",
  //     title: "Group",
  //     from: "Group",
  //     group: "UI",
  //     smallCode: `<Group maxWidth="70%"><Button size={40} rounded>Button</Button><Button size={40} rounded>Button</Button></Group>`,
  //     code: `<Fragment><Flex p={30}>
  //     <Group gap={1}>
  //         <Button>Label</Button>
  //         <Button>Label</Button>
  //         <Button>Label</Button>
  //     </Group>
  // </Flex>
  // <Flex bg="primary" bgAlpha={0.1} p={30}  align="center">
  //     <Headline>Welcome back</Headline>
  //     <Text o={0.5}>Login with your credentials</Text>
  //     <Form maxWidth={600} buttonProps={{mt: 15}} onSubmit={(doc, reset) => {
  //         alert(JSON.stringify(doc))
  //         reset()
  //     }}>
  //     <Group mt={30} vertical >
  //         <Input type="text" placeholder="E-Mail" field="mail" />
  //         <Input type="text" placeholder="Password" field="pw" />
  //     </Group>
  //     </Form>
  // </Flex><Fragment>`
  //   },
  {
    path: "/avatar",
    title: "Avatar",
    from: "Avatar",
    group: "UI",
    smallCode: `<Avatar size={66} shadow={10} shadowColor="rgba(0,0,0,0.2)" source={{uri: "https://images.unsplash.com/photo-1506252374453-ef5237291d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"}} />`,
    code: `<Flex row wrap align="center" content="space-around">
    <Avatar bg="primary" char="UN" />
    <Avatar
      size={66}
      shadow={10}
      shadowColor="rgba(0,0,0,0.2)"
      source={{
        uri:
          "https://images.unsplash.com/photo-1506252374453-ef5237291d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
      }}
    />
    <Avatar
      size={66}
      char="IK"
      source={{
        uri:
          "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60"
      }}
    />
    <Avatar bg="success" darken={0.5} char="IT" />
  </Flex>;`
  },
  {
    path: "/icon",
    title: "Icon",
    from: "Icon",
    group: "UI",
    smallCode: `<Icon name="zap" size={50} animate />`,
    code: `function RenderIcon() {
      const names = Object.keys(icons);
      const [index, setIndex] = useState(0);
      useInterval(() => {
        setIndex((index + 1) % names.length);
      }, 1500);
      return (
        <Flex align="center" w="100%" p={30}>
          <Flex align="center" w="100%" py={50}>
            <Icon size={150} strokeWidth={1} name={names[index]} animate />
          </Flex>
          <Grid min={100} w="100%">
            {names
              .sort((a, b) => a > b)
              .map(name => (
                <Flex align="center" my={20} w="100%">
                  <Icon name={name} />
                  <Text mt={10}>{name}</Text>
                </Flex>
              ))}
          </Grid>
        </Flex>
      );
    }`
  },
  {
    path: "/chart",
    title: "Chart",
    from: "Chart",
    smallCode: `<Flex w="200" h={80}><Chart data={[10,15,13,17,15,22]} height={80} onPress={bar => alert(bar.index)} /></Flex>`,
    code: `<Chart data={[10,15,13,17,15,22]} height={150} onPress={bar => alert(bar.index)} />`
  },
  {
    path: "/grid",
    title: "Grid",
    from: "Grid",
    group: "UI",
    smallCode: `<Grid w={160} min={50} gap={5}>
      <Box bg="primary" w="100%" h={50} />
      <Box bg="primary" w="100%" h={50} />
      <Box bg="primary" w="100%" h={50} />
    </Grid>`,
    code: `<Grid w="100%" min={100} gap={5}>
    <Box bg="primary" w="100%" h={50} />
    <Box bg="primary" w="100%" h={50} />
    <Box bg="primary" w="100%" h={50} />
  </Grid>;`
  },
  {
    path: "/progress",
    title: "Progress",
    from: "Progress",
    group: "UI",
    smallCode: `<Progress size={70} value={66} />`,
    code: `<Flex row wrap content="space-around" align="center">
    <Progress value={66} showValue />
    <Progress
      value={33}
      size={100}
      angle={180}
      formatValue={v => v + "%"}
      showValue
    />
    <Progress
      value={33}
      size={100}
      trackWidth={9}
      progressWidth={3}
      formatValue={v => v + "%"}
      showValue
    />
    <Progress loading />
  </Flex>`
  },
  {
    path: "/swiper",
    title: "Swiper",
    from: "Swiper",
    group: "UI",
    smallCode: `<Swiper w={160} h={100} autoplay dots>
      <Box bg="primary" bgAlpha={0.75} flex={1} />
      <Box bg="primary" bgAlpha={0.5} flex={1} />
      <Box bg="primary" bgAlpha={0.25} flex={1} />
    </Swiper>`,
    code: `<Flex>
    <Flex w="100%" h={200}>
      <Swiper flex={1} dots>
        <Box bg="primary" bgAlpha={0.75} flex={1} />
        <Box bg="primary" bgAlpha={0.5} flex={1} />
        <Box bg="primary" bgAlpha={0.25} flex={1} />
      </Swiper>
    </Flex>
    <Flex w="100%" h={200}>
      <Swiper
        flex={1}
        vertical
        autoplay
        dots
        dotsProps={{
          roundness: 0,
          trackSize: 2,
          indicatorColor: "#FFF",
          trackColor: "#FFF"
        }}
      >
        <Box bg="#000" bgAlpha={0.75} flex={1} />
        <Box bg="#000" bgAlpha={0.5} flex={1} />
        <Box bg="#000" bgAlpha={0.25} flex={1} />
      </Swiper>
    </Flex>
  </Flex>;`
  },
  {
    path: "/form",
    title: "Form",
    from: "Form",
    group: "Inputs",
    smallCode: `<Button>Submit</Button>`,
    code: `function form() {
      const formRef = useRef(null);
      return (
        <Fragment>
          <Form
            ref={formRef}
            onSubmit={(doc, reset) => {
              alert(JSON.stringify(doc));
              //reset()
            }}
            buttonProps={{ mt: 10 }}
          >
            <Grid gap={20} min={200}>
              <Input
                field="text.bla"
                w="100%"
                type="text"
                label="Text"
                clean={false}
                placeholder="placeholder"
                required
              />
              <Input
                field="text.blub"
                w="100%"
                type="text"
                label="Text"
                clean={false}
                placeholder="placeholder"
                required
              />
            </Grid>
            <Input field="range" type="range" label="Slider" />
    
            <Input  label="Tabs as select">
              <Tabs
                field="tabs"
                defaultValue={0}
                options={[
                  { label: "Tab 1", value: 0 },
                  { label: "Tab 2", value: 1 }
                ]}
                indicatorSize="100%"
                activeColor="#FFF"
                borderRadius={35}
                font="p"
              />
            </Input>
    
            <Input field="tags" type="tags" label="Tags" value={["Tag"]} />
            <Input field="switch" type="switch" label="Switch" />
            <Input
              field="select"
              type="select"
              label="Select"
              options={["One", "Two"]}
            />
            <Input
              field="multi"
              type="multiselect"
              label="MultiSelect"
              options={["One", "Two"]}
            />
            <Input field="number" type="number" label="Number" />
            <Input field="checkbox" type="checkbox" label="Checkbox" />
            <Input field="date" type="date" label="DatePicker" />
            <Input field="color" type="color" label="Color" />
          </Form>
          <Button mt={15} w={200} onPress={() => formRef.current.submit()}>
            Custom trigger
          </Button>
        </Fragment>
      );
    }`
  },
  {
    path: "/textinput",
    title: "Text",
    from: "Input",
    group: "Inputs",
    smallCode: `<Input.Text width="80%" bg="input" />`,
    code: `<Input.Text width="80%" bg="input" />`
  },
  {
    path: "/slider",
    title: "Slider",
    from: "Input",
    group: "Inputs",
    smallCode: `<Input.Slider w="80%" steps={20} value={30} />`,
    code: `<Flex align="center">
    <Input.Slider showValue="onDown" w="80%" steps={20} value={20} />
    <Input.Slider
      showValue="onDown"
      w="80%"
      value={20}
      mt={100}
      onChange={value => console.log(value)}
      handleFocusOpacity={0}
      showTicks={false}
      trackHeight={50}
      handleSize={50}
      showHandle={false}
      handleColor="transparent"
    />
    <Input.Slider showValue formatValue={v => v + "%"}  mt={100} w="80%" steps={20} value={[20, 40]} onChange={value => console.log(value)} />
    <Input.Slider mt={100} height={300} vertical steps={10} value={30} />
  </Flex>;`
  },
  {
    path: "/switch",
    title: "Switch",
    from: "Input",
    group: "Inputs",
    smallCode: `<Input.Switch />`,
    code: `<Input.Switch />`
  },
  {
    path: "/color",
    title: "Color",
    from: "Input",
    group: "Inputs",
    smallCode: `<Input.Color w="80%"  bg="input" />`,
    code: `<Form><Input.Color w="80%"  bg="input" field="color" defaultValue="#FFF" /></Form>`
  },
  {
    path: "/checkbox",
    title: "Checkbox",
    from: "Input",
    group: "Inputs",
    smallCode: `<Input.Checkbox circleSize={40} />`,
    code: `<Input.Checkbox circleSize={40} />`
  },
  {
    path: "/number",
    title: "Number",
    from: "Input",
    group: "Inputs",
    smallCode: `<Input.Number w="80%"  bg="input"/>`,
    code: `<Input.Number w="80%"  bg="input"/>`
  },
  {
    path: "/select",
    title: "Select",
    from: "Input",
    group: "Inputs",
    smallCode: `<Input.Select w="80%" options={["unikit", "is awesome"]} bg="input" />`,
    code: `<Input.Select w="80%" options={["unikit", "is awesome"]} bg="input" />`
  },
  {
    path: "/datepicker",
    title: "DatePicker",
    from: "Input",
    group: "Inputs",
    smallCode: `<Input.DatePicker w="80%" bg="input" />`,
    code: `<Form><Input type="date" label="Date" w="100%"  bg="input" field="date" /><Input type="time" label="Time"  w="100%" bg="input" field="time" /><Input type="datetime" label="Datetime" w="100%" bg="input" field="datetime" /></Form>`
  }
];

module.exports.pages = pages;
