const mongoose = require('mongoose');
const express = require('express');
const User = require('./models/User'); // User 모델

const app = express();
const PORT = 3000;

// MongoDB 연결
mongoose.connect('mongodb+srv://wldygus2023:Wldkfka!23@cluster0.f2jfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB에 성공적으로 연결되었습니다.'))
  .catch((err) => console.error('MongoDB 연결 실패:', err));

// JSON 형식의 데이터를 받을 수 있게 설정
app.use(express.json());

// 정적 파일 제공 설정
app.use(express.static('public'));

// 사용자 등록 API (POST)
app.post('/users', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const user = new User({ name, email, age });
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 사용자 조회 API (GET)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});

// 사용자 업데이트 API (PUT)
app.put('/users/:id', async (req, res) => {
    const { id } = req.params; // URL 파라미터에서 사용자 ID 가져오기
    const { name, email, age } = req.body; // 요청 본문에서 업데이트할 데이터 가져오기
    try {
        const user = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
        if (!user) {
            return res.status(404).send('사용자를 찾을 수 없습니다.');
        }
        res.status(200).send(user); // 업데이트된 사용자 정보 반환
    } catch (error) {
        res.status(500).send(error);
    }
});

// 사용자 삭제 API (DELETE)
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params; // URL 파라미터에서 사용자 ID 가져오기
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).send('사용자를 찾을 수 없습니다.');
        }
        res.status(200).send('사용자가 삭제되었습니다.'); // 삭제 완료 메시지 반환
    } catch (error) {
        res.status(500).send(error);
    }
});

// 서버 시작

app.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on port 3000');
  });
  